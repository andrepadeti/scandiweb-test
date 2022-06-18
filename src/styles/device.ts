interface Dictionary {
  [index: string]: string
}

const size: Dictionary = {
  sm: '575px',
  md: '767px',
  lg: '991px',
  xl: '1199px',
  xxl: '1399px',
}

export const device: Dictionary = {
  mobile: `(max-width: ${size.sm})`,
  tablet: `(max-width: ${size.md})`,
  desktop: `(max-width: ${size.lg})`,
  desktopXL: `(max-width: ${size.xl})`,
  desktopXXL: `(max-width: ${size.xxl})`,
}
