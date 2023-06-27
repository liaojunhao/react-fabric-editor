import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        作品类型
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        下载
      </a>
    )
  }
];

const Save = () => {
  return (
    <Space>
      <Button type="text">清空</Button>
      <Dropdown menu={{ items }} placement="bottom">
        <Button type="primary" style={{ width: 120 }}>
          下载
        </Button>
      </Dropdown>
    </Space>
  );
};

export default Save;
