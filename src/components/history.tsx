import { Tooltip, Button } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';
const History = () => {
  return (
    <div style={{ display: 'inline-block' }}>
      {/* 撤销 */}
      <Tooltip placement="bottom" title="撤销">
        <Button type="text" size="small" disabled>
          <UndoOutlined style={{ fontSize: 18 }} />
        </Button>
      </Tooltip>
      {/* 重做 */}
      <Tooltip placement="bottom" title="重做">
        <Button type="text" size="small" disabled>
          <RedoOutlined style={{ fontSize: 18 }} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default History;
