import React from "react";
import { Space, Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const Raiting = ({ value, setValue }) => {
  //   const [value, setValue] = useState(0);
  return (
    <Space>
      <Rate tooltips={desc} onChange={setValue} value={value} />
    </Space>
  );
};
export default Raiting;
