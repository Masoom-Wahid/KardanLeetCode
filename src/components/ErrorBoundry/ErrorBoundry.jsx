import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });

    // Log the error to an error reporting service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error, errorInfo) {
    // Implement your error reporting service logic here
    console.error("Error reported to service:", error, errorInfo);
  }

  handleNetworkError = (event) => {
    this.componentDidCatch(event.error, null);
  };

  handleUnhandledPromiseRejection = (event) => {
    this.componentDidCatch(event.reason, null);
  };

  componentDidMount() {
    // Example: Handling network errors
    window.addEventListener("error", this.handleNetworkError);

    // Example: Handling unhandled promise rejections
    window.addEventListener(
      "unhandledrejection",
      this.handleUnhandledPromiseRejection
    );

    // Delaying the state update to the next tick using setTimeout
    setTimeout(() => {
      this.setState({ hasError: false });
    }, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hasError !== this.state.hasError) {
      console.log("State updated, hasError:", this.state.hasError);
    }
  }

  handleCloseModal = () => {
    console.log("Closing modal");
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  componentWillUnmount() {
    // Clean up event listeners
    window.removeEventListener("error", this.handleNetworkError);
    window.removeEventListener(
      "unhandledrejection",
      this.handleUnhandledPromiseRejection
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <button className="close-button" onClick={this.handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="error-title">Oops! An Error Occurred</h2>
            <p className="error-message">
              {this.state.error && this.state.error.toString()}
            </p>
            <details className="error-details">
              <summary>Technical Details</summary>
              <pre>
                {(this.state.errorInfo &&
                  this.state.errorInfo.componentStack) ||
                  "No Specific Error To Display!"}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
