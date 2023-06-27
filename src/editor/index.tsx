import { Layout } from 'antd';
import './index.less';
import { Canvas } from '../canvas';
const { Header, Content } = Layout;

const ImageMapEditor = () => {
  // 布局样式
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: 45,
    paddingInline: 45,
    lineHeight: '45px',
    background: '#fff',
    padding: '0 10px',
    borderBottom: '1px solid #eef2f8'
  };
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#108ee9',
    display: 'flex',
    height: 'calc(100vh - 45px)'
  };

  const siderStyle: React.CSSProperties = {
    width: 380,
    height: '100%',
    display: 'flex',
    background: '#fff'
  };
  const rightStyle: React.CSSProperties = {
    width: 530,
    height: '100%',
    padding: 10,
    overflowY: 'auto',
    background: '#fff'
  };
  const worksStyle: React.CSSProperties = {
    width: '100%',
    position: 'relative',
    background: '#f1f1f1'
  };

  return (
    <div className="editor">
      <Layout>
        <Header style={headerStyle}></Header>
        <Content style={contentStyle}>
          {/* 左侧操作拦 */}
          <div style={siderStyle}></div>
          {/* 画布区域 */}
          <div id="workspace" style={worksStyle}>
            <Canvas></Canvas>
          </div>
          {/* 属性区域 380 */}
          <div style={rightStyle}></div>
        </Content>
      </Layout>
    </div>
  );
};

export default ImageMapEditor;
