/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-23 14:21:53
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-09-23 14:25:27
 * @FilePath: \nextai\src\components\PdfUploader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import axios from "axios"; // axios是一个用于发送HTTP请求的库
import { InboxOutlined } from "@ant-design/icons"; //InboxOutlined是antd图标库中的一个图标，用于表示上传文件
import { message, Upload } from "antd";

const { Dragger } = Upload; //解构语法，从Upload中解构出Dragger组件

const DOMAIN = "http://localhost:5001";

const uploadToBackend = async (file) => {//定义一个异步函数uploadToBackend，用于将文件上传到后端
  const formData = new FormData();//formData是HTML5中提供的一个对象，用于构建表单数据
  formData.append("file", file);
  try {
    const response = await axios.post(`${DOMAIN}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading file: ", error);
    return null;
  }
};

const attributes = {//定义一个对象attributes，包含上传组件的属性
  name: "file",
  multiple: true,
  customRequest: async ({ file, onSuccess, onError }) => {
    const response = await uploadToBackend(file);
    if (response && response.status === 200) {
      // Handle success
      onSuccess(response.data);
    } else {
      // Handle error
      onError(new Error("Upload failed"));
    }
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const PdfUploader = () => {
  return (
    //Dragger的作用是将文件拖拽到指定区域
    <Dragger {...attributes}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default PdfUploader;
