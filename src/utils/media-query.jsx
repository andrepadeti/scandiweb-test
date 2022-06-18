import * as React from 'react'
import { device } from '../styles/device'

export function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export function withMediaQuery(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isMobile: window.matchMedia(device.mobile).matches,
      }
    }

    componentDidMount() {
      window
        .matchMedia(device.mobile)
        .addEventListener('change', this.mediaQueryListener)
    }

    componentWillUnmount() {
      window
        .matchMedia(device.mobile)
        .removeEventListener('change', this.mediaQueryListener)
    }

    mediaQueryListener = e => {
      this.setState({ isMobile: e.matches })
    }

    render() {
      return <WrappedComponent isMobile={this.state.isMobile} {...this.props} />
    }
  }
}
