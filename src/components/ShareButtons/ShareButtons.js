import React from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TwitterIcon,
    FacebookIcon,
    WhatsappIcon
  } from "react-share";

export function ShareButtons({
  data
}) {
  return <div className="share-buttons">
    <TwitterShareButton title={data && data.title} url={window.location.href}>
      <TwitterIcon size={48} />
    </TwitterShareButton>
    <FacebookShareButton quote={data && data.title} url={window.location.href}>
      <FacebookIcon size={48} />
    </FacebookShareButton>
    <WhatsappShareButton title={data && data.title} url={window.location.href}>
      <WhatsappIcon size={48} />
    </WhatsappShareButton>
  </div>;
}
  