import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import styles from './index.module.less';

const { Header, Content } = Layout;

const ImageMapEditor = () => {
  const [count, setCount] = useState(0);
  console.log('ImageMapEditor');

  useEffect(() => {
    console.log('11111');

    setCount(count + 1);
  }, []);

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    background: '#fff'
  };
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#108ee9',
    display: 'flex',
    height: 'calc(100vh - 64px)'
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

  return (
    <div className={styles.edtior}>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          <div style={siderStyle}></div>
          {/* 画布区域 */}
          <div
            id="workspace"
            style={{
              width: '100%',
              position: 'relative',
              background: '#f1f1f1'
            }}
          >
            画布中心
          </div>
          {/* 属性区域 380 */}
          <div style={rightStyle}></div>
        </Content>
      </Layout>
    </div>
  );
};

export default ImageMapEditor;
