import { useEffect } from "react";
import { ADSENSE_ID, ADTEST } from "../lib/constants";

export default function Ad({
  className,
  style,
  layout,
  format,
  client = ADSENSE_ID,
  slot,
  responsive,
  layoutKey,
  auto,
  title,
}) {
  useEffect(() => {
    try {
      let adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      console.error(`Ad: `, e);
    }
  }, []);

  const MODE = ADTEST || process.env.NODE_ENV === `development`;

  return (
    <div className="my-4">
      {title ? (
        <div className="text-center text-xs uppercase opacity-50">
          Advertisement
        </div>
      ) : null}
      <div className={className ? className + ` text-center` : `text-center`}>
        <ins
          className={`adsbygoogle`}
          style={
            auto
              ? {
                  display: "inline-block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : style
              ? style
              : { display: "block" }
          }
          data-ad-layout={layout}
          data-ad-format={format ? format : `auto`}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-layout-key={layoutKey}
          data-full-width-responsive={auto ? `true` : responsive}
          {...(MODE ? { "data-adtest": "on" } : null)}
        />
      </div>
    </div>
  );
}
