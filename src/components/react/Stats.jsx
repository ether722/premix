import React, { Component } from 'react';

class StatsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginTime: performance.now() || Date.now(),
      prevTime: this.state.beginTime,
      frames: 0,
      min: Infinity,
      max: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.update.bind(this), 1000 / 60); // 假设每秒更新60次，模拟原逻辑
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  update = () => {
    const time = performance.now() || Date.now();
    const { frames, beginTime, prevTime, min, max } = this.state;

    this.setState({
      frames: frames + 1,
      min: Math.min(min, time - beginTime),
      max: Math.max(max, time - beginTime),
    });

    if (time >= prevTime + 1000) {
      const fps = (frames * 1000) / (time - prevTime);
      const ms = time - beginTime;
      this.setState({ prevTime: time, frames: 0 }, () => {
        // 在setState回调中处理状态更新后的逻辑，避免直接操作DOM
        this.props.onUpdate(fps, ms, this.state.min, this.state.max);
      });
    }
  };

  render() {
    // 这里简化展示，实际应根据fps, ms等数据渲染图表或文字
    return (
      <div>
        {/* 渲染面板内容，例如FPS和MS的值 */}
        FPS: { /* 这里可以用state中的fps值 */ } MS: { /* 这里可以用state中的ms值 */ }
      </div>
    );
  }
}

class Stats extends Component {
  showPanel = (id) => {
    // 根据id切换显示不同的面板，这里简化处理
    console.log(`Switching to panel ${id}`);
  };

  addPanel = (panelName) => {
    // 在React中，添加新面板可能意味着动态改变state或者使用children传递
    console.log(`Adding panel: ${panelName}`);
  };

  render() {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        cursor: 'pointer',
        opacity: 0.9,
        zIndex: 10000,
      }}>
        {/* 原有的面板逻辑可以通过props传递给StatsPanel或其他自定义组件 */}
        <StatsPanel onUpdate={(fps, ms, min, max) => {
          // 处理接收到的更新数据，用于实际渲染
          console.log(`FPS: ${fps}, MS: ${ms}, Min: ${min}, Max: ${max}`);
        }} />
        {/* 添加更多面板或根据需求调整 */}
      </div>
    );
  }
}

export { Stats };