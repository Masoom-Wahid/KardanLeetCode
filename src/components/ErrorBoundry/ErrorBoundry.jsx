import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidMount() {
    window.addEventListener("error", this.handleGlobalError);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleGlobalError);
  }

  handleGlobalError = (event) => {
    // Prevent the default browser error handling
    event.preventDefault();

    this.setState({
      hasError: true,
      error: new Error(`Global Error: ${event.message}`),
      errorInfo: null,
    });
  };

  closeModal = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-modal">
          <div className="modal-content">
            <span className="close-icon" onClick={this.closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <h2>Something went wrong.</h2>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
