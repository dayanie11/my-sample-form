import React, { Component } from 'react';

export default class FilePreview extends Component {

  render() {
    return(
        this.props.images.map((file) => 
        <div className="image-container"><img name="myfile" key={file} src={file}/></div>
        )
    )
  }

}