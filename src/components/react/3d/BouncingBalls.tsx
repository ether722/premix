import React, { useEffect, useRef, useCallback, useState } from 'react';

export interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

const BouncingBalls: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ballsRef = useRef<Ball[]>([]);
    const animationFrameRef = useRef<number>();
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const lastBeatTimeRef = useRef<number>(0);
    const beatIntervalRef = useRef<number>(500); // 默认 120 BPM
    const energyHistoryRef = useRef<number[]>([]);
    const [bpm, setBpm] = useState<number>(120);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioError, setAudioError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // 检测音频能量
    const detectBeat = useCallback(() => {
        if (!dataArrayRef.current) return false;
        
        const currentTime = Date.now();
        if (currentTime - lastBeatTimeRef.current < beatIntervalRef.current * 0.5) {
            return false; // 防止节拍过于密集
        }

        // 计算当前帧的能量
        const currentEnergy = dataArrayRef.current.reduce((sum, value) => sum + value * value, 0);
        energyHistoryRef.current.push(currentEnergy);
        
        // 保持历史记录在合理范围内
        if (energyHistoryRef.current.length > 30) {
            energyHistoryRef.current.shift();
        }

        // 计算平均能量和标准差
        const avgEnergy = energyHistoryRef.current.reduce((a, b) => a + b, 0) / energyHistoryRef.current.length;
        const variance = energyHistoryRef.current.reduce((a, b) => a + Math.pow(b - avgEnergy, 2), 0) / energyHistoryRef.current.length;
        const threshold = avgEnergy + Math.sqrt(variance) * 0.5; // 降低阈值，使检测更敏感

        // 检测是否为节拍
        if (currentEnergy > threshold) {
            lastBeatTimeRef.current = currentTime;
            return true;
        }

        return false;
    }, []);

    // 初始化音频分析器
    const initAudioAnalyser = useCallback(async () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new AudioContext();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 256;
                const bufferLength = analyserRef.current.frequencyBinCount;
                dataArrayRef.current = new Uint8Array(bufferLength);

                // 创建音频元素
                if (!audioRef.current) {
                    const audioUrl = encodeURI('/Ignite My Heart.mp3');
                    audioRef.current = new Audio(audioUrl);
                    audioRef.current.crossOrigin = 'anonymous';
                    
                    // 监听音频加载完成事件
                    audioRef.current.addEventListener('loadedmetadata', () => {
                        const defaultBpm = 120;
                        setBpm(defaultBpm);
                        beatIntervalRef.current = (60 / defaultBpm) * 1000;
                        setIsInitialized(true);
                    });

                    // 监听音频错误
                    audioRef.current.addEventListener('error', (e: ErrorEvent) => {
                        const error = e.error || new Error('未知错误');
                        setAudioError(`音频加载失败: ${error.message}`);
                        console.error('音频错误:', error);
                    });

                    // 监听音频结束
                    audioRef.current.addEventListener('ended', () => {
                        setIsPlaying(false);
                    });

                    // 设置循环播放
                    audioRef.current.loop = true;
                }

                // 等待音频加载完成
                await audioRef.current.load();
                
                sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
                sourceRef.current.connect(analyserRef.current);
                analyserRef.current.connect(audioContextRef.current.destination);
            }

            // 如果音频上下文被挂起，则恢复
            if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }
        } catch (error: unknown) {
            const err = error instanceof Error ? error : new Error('未知错误');
            console.error('初始化音频分析器失败:', err);
            setAudioError('初始化音频失败: ' + err.message);
        }
    }, []);

    // 处理播放/暂停
    const handlePlayPause = useCallback(async () => {
        try {
            if (!audioRef.current || !audioContextRef.current) {
                await initAudioAnalyser();
            }

            if (!audioRef.current) return;

            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // 确保音频上下文是激活的
                if (audioContextRef.current?.state === 'suspended') {
                    await audioContextRef.current.resume();
                }
                
                await audioRef.current.play();
                setIsPlaying(true);
                setAudioError(null);
            }
        } catch (error: unknown) {
            const err = error instanceof Error ? error : new Error('未知错误');
            console.error('播放音频失败:', err);
            setAudioError('播放失败: ' + err.message);
            setIsPlaying(false);
        }
    }, [isPlaying, initAudioAnalyser]);

    // 初始化或重置画布
    const initCanvas = useCallback(() => {
        if (!canvasRef.current) return;
        
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        ctxRef.current = canvas.getContext('2d');
        if (ctxRef.current) {
            ctxRef.current.fillStyle = '#000000';
            ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, []);

    // 绘制音频波形
    const drawAudioWave = useCallback(() => {
        if (!ctxRef.current || !analyserRef.current || !dataArrayRef.current) return;

        const ctx = ctxRef.current;
        const analyser = analyserRef.current;
        const dataArray = dataArrayRef.current;
        
        analyser.getByteFrequencyData(dataArray);
        
        const barWidth = (ctx.canvas.width / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i] * 2;
            
            const hue = (i / dataArray.length) * 360;
            ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.8)`;
            
            // 绘制上下对称的波形
            ctx.fillRect(x, ctx.canvas.height - barHeight, barWidth, barHeight);
            ctx.fillRect(x, 0, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }, []);

    const animate = useCallback(() => {
        if (!ctxRef.current) return;
        const ctx = ctxRef.current;

        // 绘制音频波形
        drawAudioWave();

        // 检测节拍
        if (detectBeat()) {
            // 创建多个球体形成爆炸效果
            if (canvasRef.current && dataArrayRef.current) {
                const canvas = canvasRef.current;
                const averageFrequency = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length;
                
                // 创建多个球体
                const numBalls = 3 + Math.floor(averageFrequency / 50); // 根据频率决定球的数量
                for (let i = 0; i < numBalls; i++) {
                    const angle = (Math.PI * 2 * i) / numBalls;
                    const speed = 15 + averageFrequency / 10;
                    const size = 10 + Math.random() * 20 + averageFrequency / 8;
                    
                    const newBall: Ball = {
                        x: canvas.width / 2, // 从中心发射
                        y: canvas.height / 2,
                        vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4),
                        vy: Math.sin(angle) * speed * (0.8 + Math.random() * 0.4),
                        radius: size,
                        color: `hsla(${(averageFrequency + i * 30) % 360}, 100%, 60%, 0.8)`
                    };
                    ballsRef.current = [...ballsRef.current, newBall];
                }
            }
        }

        // 更新和绘制所有球
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // 降低透明度，产生拖尾效果
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ballsRef.current = ballsRef.current.filter(ball => {
            // 更新位置
            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.vy += 0.3; // 增加重力效果

            // 边界碰撞检测
            if (ball.x - ball.radius < 0 || ball.x + ball.radius > ctx.canvas.width) {
                ball.vx *= -0.8;
                ball.x = Math.max(ball.radius, Math.min(ctx.canvas.width - ball.radius, ball.x));
            }
            if (ball.y - ball.radius < 0 || ball.y + ball.radius > ctx.canvas.height) {
                ball.vy *= -0.8;
                ball.y = Math.max(ball.radius, Math.min(ctx.canvas.height - ball.radius, ball.y));
            }

            // 绘制球体
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            
            // 创建径向渐变
            const gradient = ctx.createRadialGradient(
                ball.x, ball.y, 0,
                ball.x, ball.y, ball.radius
            );
            gradient.addColorStop(0, ball.color.replace('0.8', '1')); // 中心更亮
            gradient.addColorStop(1, ball.color.replace('0.8', '0.3')); // 边缘更暗
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // 添加光晕效果
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius * 1.2, 0, Math.PI * 2);
            ctx.strokeStyle = ball.color.replace('0.8', '0.2');
            ctx.lineWidth = 2;
            ctx.stroke();

            const isSlowAndGrounded = Math.abs(ball.vy) < 0.1 && 
                                    Math.abs(ball.y - (ctx.canvas.height - ball.radius)) < 1;
            return !isSlowAndGrounded;
        });

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [drawAudioWave, detectBeat]);

    // 初始化
    useEffect(() => {
        initCanvas();
        initAudioAnalyser(); // 只初始化，不自动播放
        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, [animate, initCanvas, initAudioAnalyser]);

    // 当收到节拍时创建新的球
    useEffect(() => {
        if (canvasRef.current && dataArrayRef.current) {
            const canvas = canvasRef.current;
            // 使用音频数据来影响球的属性
            const averageFrequency = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length;
            
            const newBall: Ball = {
                x: Math.random() * canvas.width,
                y: 0,
                vx: (Math.random() - 0.5) * (15 + averageFrequency / 10),
                vy: Math.random() * (5 + averageFrequency / 20),
                radius: 15 + Math.random() * 25 + averageFrequency / 10,
                color: `hsla(${Math.random() * 360}, ${80 + averageFrequency/4}%, 60%, 0.8)`
            };
            ballsRef.current = [...ballsRef.current, newBall];
        }
    }, []);

    // 设置画布尺寸
    useEffect(() => {
        const handleResize = () => {
            initCanvas();
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [initCanvas]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full"
                style={{ background: 'black' }}
            />
            <div className="fixed top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded flex flex-col gap-2">
                <div>BPM: {bpm}</div>
                <button 
                    onClick={handlePlayPause}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                    disabled={!isInitialized}
                >
                    {isPlaying ? '暂停' : '播放'}
                </button>
                {!isInitialized && !audioError && (
                    <div className="text-yellow-500 text-sm">
                        正在初始化音频...
                    </div>
                )}
                {audioError && (
                    <div className="text-red-500 text-sm">
                        {audioError}
                    </div>
                )}
            </div>
        </>
    );
};

export default BouncingBalls; 