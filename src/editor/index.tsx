import { Layout, Divider, Tooltip, Switch, Space } from 'antd';
import './index.less';
import { Canvas } from '../canvas';
import { GithubOutlined } from '@ant-design/icons';

import ImportJSON from '../components/importJSON';
import History from '../components/history';
import PreviewCurrent from '../components/previewCurrent';
import Save from '../components/save';
import { MutableRefObject, useRef, useEffect } from 'react';

const { Header, Content } = Layout;

const ImageMapEditor = () => {
  const canvasRef: MutableRefObject<any> = useRef(null);

  useEffect(() => {
    console.log('canvasRef', canvasRef.current);
  }, []);

  // 布局样式
  const headerStyle: React.CSSProperties = {
    height: 45,
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
        <Header style={headerStyle}>
          <span className="logo">
            <a
              href="https://github.com/liaojunhao/react-fabric-editor"
              target="_blank"
            ></a>
            <GithubOutlined style={{ fontSize: 28 }} />
          </span>
          {/* 导入 */}
          <ImportJSON></ImportJSON>
          <Divider type="vertical" />
          {/* 标尺开关 */}
          <Tooltip placement="bottom" title={'标尺'}>
            <Switch
              onChange={(checked: boolean) => {
                console.log(`switch to ${checked}`);
              }}
            />
          </Tooltip>
          <Divider type="vertical" />
          {/* 历史记录 */}
          <History></History>

          <div style={{ float: 'right' }}>
            <Space>
              {/* 预览 */}
              <PreviewCurrent></PreviewCurrent>
              {/* 下载 */}
              <Save></Save>
            </Space>
          </div>
        </Header>
        <Content style={contentStyle}>
          {/* 左侧操作拦 */}
          <div style={siderStyle}></div>
          {/* 画布区域 */}
          <div id="workspace" style={worksStyle}>
            <Canvas ref={canvasRef}></Canvas>
          </div>
          {/* 属性区域 380 */}
          <div style={rightStyle}></div>
        </Content>
      </Layout>
    </div>
  );
};

export default ImageMapEditor;
