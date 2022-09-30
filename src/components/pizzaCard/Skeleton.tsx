import { FC } from "react"
import ContentLoader from "react-content-loader"

const Skeleton: FC = (props) => (
  <ContentLoader 
    speed={2}
    width={315}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="139" cy="128" r="128" /> 
    <rect x="0" y="271" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="311" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="409" rx="30" ry="30" width="90" height="45" /> 
    <rect x="127" y="409" rx="31" ry="31" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton