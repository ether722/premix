import React, { useEffect, useState } from 'react';

export default ({ children, type }) => {
    let className = '';

    switch (type) {
        case 'flex':
            className = 'layout-flex';
            break;
        case 'grid':
            className = 'layout-grid';
            break;
        case 'table':
            className = 'layout-table';
            break;
        case 'waterfall': // 瀑布流式
            className = 'layout-waterfall';
            break;
        case 'mixed': // 混合布局，这里仅作示例，具体实现会很复杂，需根据实际需求设计
            className = 'layout-mixed';
            break;
        default:
            className = 'layout-default'; // 如果没有匹配的类型，默认布局
    }

    const [layoutConfig, setLayoutConfig] = useState({
        cols: 1, // Default values
        gutter: 10,
        itemWidth: '100%',
    });

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const newConfig = calculateResponsiveLayout(screenWidth);
            setLayoutConfig(newConfig);
        };

        // Initial call and setup event listener
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the listener when component unmounts
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures this effect runs only once

    const { cols, gutter, itemWidth } = layoutConfig;

    return (
        <div
            className={`layout-container ${className}`}
            style={{
                gridTemplateColumns: `repeat(${cols}, ${itemWidth})`,
                gap: `${gutter}px`,
            }}
        >
            {children}
        </div>
    );
};

// 动态计算宽度、间距，对不同屏幕尺寸的响应式支持
function calculateResponsiveLayout(screenWidth) {
    const breakpoints = [
        { width: 0, maxWidth: 575, cols: 1, gutter: 10 }, // Mobile
        { width: 576, maxWidth: 767, cols: 2, gutter: 20 }, // Small tablets
        { width: 768, maxWidth: 991, cols: 3, gutter: 30 }, // Medium devices
        { width: 992, maxWidth: 1199, cols: 4, gutter: 40 }, // Large tablets to laptops
        { width: 1200, maxWidth: Infinity, cols: 5, gutter: 50 }, // Desktops and up
    ];

    // 找到匹配的断点
    const matchedBreakpoint = breakpoints.find(breakpoint =>
        screenWidth >= breakpoint.width && screenWidth <= breakpoint.maxWidth
    );

    if (!matchedBreakpoint) {
        console.warn('No matching breakpoint found for screen width:', screenWidth);
        return null; // 或者默认配置
    }

    // 根据列和装订线计算项目宽度
    const totalGutterWidth = (matchedBreakpoint.cols - 1) * matchedBreakpoint.gutter;
    const containerWidth = 100; // 为简单起见，假设全宽容器
    const itemWidth = (containerWidth - totalGutterWidth) / matchedBreakpoint.cols;

    return {
        cols: matchedBreakpoint.cols,
        gutter: matchedBreakpoint.gutter,
        itemWidth: `${itemWidth}%`, // CSS 灵活性的百分比
    };
}
