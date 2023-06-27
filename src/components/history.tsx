import { Tooltip, Button } from 'antd';
const History = () => {
  return (
    <div style={{ display: 'inline-block' }}>
      {/* 后退 */}
      <Tooltip placement="bottom">
        <Button>后退</Button>
      </Tooltip>
    </div>
  );
};

export default History;
