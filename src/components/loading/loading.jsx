import styled, { keyframes } from 'styled-components'

const OuterContainer = styled.div`
  min-block-size: 100vh;
  min-inline-size: 100vw;
  display: grid;
  place-items: center;
`

const InnerContainer = styled.div`
  display: flex;
  padding: 1rem;
`

const Sleeping = styled.div`
  position: relative;
  width: 80px;
`

const keyframe = keyframes`
  0% {
    transform: translate(0, 0) scale(0.3);
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  50% {
    transform: translate(90%, -50%) scale(0.65);
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translate(180%, -100%) scale(1);
    opacity: 0;
  } 
`

const Span = styled.span`
  --duration: 2s;
  position: absolute;
  font-size: 80px;
  opacity: 0;
  color: var(--c-primary);
  animation: ${keyframe} var(--duration) infinite linear;

  &:nth-child(2n) {
    animation-delay: calc(var(--duration) * 0.25);
  }

  &:nth-child(3n) {
    animation-delay: calc(var(--duration) * 0.75);
  }
`

const Message = styled.div``

const Loading = () => {
  return (
    <OuterContainer>
      <InnerContainer>
        <Sleeping>
          <Span>z</Span>
          <Span>z</Span>
          <Span>z</Span>
        </Sleeping>
        <Message>Heroku's dyno is sleeping. Stick around for a second!</Message>
      </InnerContainer>
    </OuterContainer>
  )
}

export default Loading
