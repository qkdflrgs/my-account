import React, { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback != null) {
        return <>{this.props.fallback}</>
      }

      return (
        <div>
          <h2>알 수 없는 문제가 발생했습니다</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            다시 불러오기
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
