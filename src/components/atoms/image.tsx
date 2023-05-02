import React from "react"

type ImageProps = {
  src: string
  alt: string
}

export const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} />
)
export default Image
