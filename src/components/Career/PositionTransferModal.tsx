import React from 'react';
import { Modal, Form, Input, Select, Space, Typography, Alert } from 'antd';
import { CareerPosition } from '@/types/career';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface PositionTransferModalProps {
  open: boolean;
  onClose: () => void;
  currentPosition?: CareerPosition;
  targetPosition?: CareerPosition | null;
  onSubmit: (values: any) => void;
}

const PositionTransferModal: React.FC<PositionTransferModalProps> = ({
  open,
  onClose,
  currentPosition,
  targetPosition,
  onSubmit
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Yêu cầu chuyển vị trí công việc"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {!currentPosition && (
        <Alert
          message="Chưa có vị trí hiện tại"
          description="Bạn cần có vị trí công việc hiện tại để có thể yêu cầu chuyển vị trí."
          type="warning"
          style={{ marginBottom: 16 }}
        />
      )}

      {!targetPosition && (
        <Alert
          message="Chưa chọn vị trí đích"
          description="Vui lòng chọn vị trí công việc mà bạn muốn chuyển đến từ sơ đồ lộ trình."
          type="info"
          style={{ marginBottom: 16 }}
        />
      )}

      {currentPosition && targetPosition && (
        <div style={{ marginBottom: 16 }}>
          <Title level={4}>Thông tin chuyển vị trí</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>Từ vị trí:</Text> {currentPosition.name} ({currentPosition.role.name})
            </div>
            <div>
              <Text strong>Đến vị trí:</Text> {targetPosition.name} ({targetPosition.role.name})
            </div>
          </Space>
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="reason"
          label="Lý do chuyển vị trí"
          rules={[{ required: true, message: 'Vui lòng nhập lý do chuyển vị trí' }]}
        >
          <TextArea
            rows={4}
            placeholder="Mô tả chi tiết lý do bạn muốn chuyển đến vị trí này..."
          />
        </Form.Item>

        <Form.Item
          name="expectedDate"
          label="Thời gian mong muốn chuyển vị trí"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian mong muốn' }]}
        >
          <Select placeholder="Chọn thời gian">
            <Select.Option value="immediate">Ngay lập tức</Select.Option>
            <Select.Option value="1month">Trong 1 tháng</Select.Option>
            <Select.Option value="3months">Trong 3 tháng</Select.Option>
            <Select.Option value="6months">Trong 6 tháng</Select.Option>
            <Select.Option value="1year">Trong 1 năm</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="additionalInfo"
          label="Thông tin bổ sung"
        >
          <TextArea
            rows={3}
            placeholder="Bất kỳ thông tin bổ sung nào khác..."
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <button type="submit" className="ant-btn ant-btn-primary">
              Gửi yêu cầu
            </button>
            <button type="button" className="ant-btn" onClick={onClose}>
              Hủy
            </button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PositionTransferModal;

