import { MODE } from "../lib/constants";
export default function Banner({
  client,
  slot,
  format,
  responsive,
  style,
  className,
  layout,
  layoutKey,
  auto,
}) {
  const devMode = process.env.NODE_ENV === `development` || MODE === "dev"; // 判断是否开发模式

  return (
    <div className={`banner` + className ? ` ` + className : ``}>
      <div className="text-center text-xs text-gray-300">ADVERTISEMENT</div>
      <ins
        className="adsbygoogle"
        style={
          style
            ? style
            : auto
            ? {
                display: `flex`,
                justifyContent: `center`,
                margin: `0 auto`,
              }
            : {
                display: `flex`,
                justifyContent: `center`,
                width: `100%`,
                height: `100%`,
              }
        }
        data-ad-layout={layout}
        data-ad-format={format ? format : `auto`}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={auto ? `true` : responsive}
        {...(devMode ? { "data-adtest": "on" } : null)}
      />
    </div>
  );
}
