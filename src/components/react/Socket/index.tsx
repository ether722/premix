import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface ScreenDetails {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface User {
    id: string;
    position: { x: number; y: number };
}

interface Props {
    socket: Socket;
}

export default ({ socket }: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [screenDetails, setScreenDetails] = useState<ScreenDetails>({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });

    useEffect(() => {
        // 监听用户列表更新
        const usersListener = (data: User[]) => {
            setUsers(data);
        };

        socket.on('users', usersListener);

        // 监听窗口变化
        const handleResize = () => {
            const tempScreenDetails: ScreenDetails = {
                x: window.screenLeft || window.screenX,
                y: window.screenTop || window.screenY,
                width: window.innerWidth,
                height: window.innerHeight
            };

            if (JSON.stringify(tempScreenDetails) !== JSON.stringify(screenDetails)) {
                setScreenDetails(tempScreenDetails);
                socket.emit('windowChange', tempScreenDetails);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 初始化时发送一次

        return () => {
            socket.off('users', usersListener);
            window.removeEventListener('resize', handleResize);
        };
    }, [socket, screenDetails]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">已连接用户: {users.length}</h2>
            <div className="space-y-2">
                <p>窗口位置: ({screenDetails.x}, {screenDetails.y})</p>
                <p>窗口大小: {screenDetails.width} x {screenDetails.height}</p>
            </div>
        </div>
    );
};
