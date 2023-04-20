import { Input } from "antd"

const BaseInput = ({ setSearchQuery }) => {

  return (
    <Input onChange={(e) => setSearchQuery(e.target.value)} placeholder={placeholder} />
  )
}

export default BaseInput;