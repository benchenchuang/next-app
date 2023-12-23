'use client';
type IProps = {
    name?: string;
    style?: React.CSSProperties;
    className?: string;
    width?: number;
    height?: number;
}
const IconSvg = ({ name, width = 20, height = 20, ...iconProps }: IProps) => {
    try {
        let Icon = require(`@/svg/${name}.svg`).default;
        return <Icon id={`svg-${name}`} width={width} height={height || width} {...iconProps} />;
    } catch (e) {
        return <>[Icon `{name}` not found!]</>;
    }
};
export default IconSvg