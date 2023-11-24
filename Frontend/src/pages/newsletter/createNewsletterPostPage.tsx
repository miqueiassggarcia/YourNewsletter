import { useRef } from 'react';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

import "../../styles/newsletter/createNewsletterPost.css";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from "react-router-dom"
import { relative } from 'path';
import { postCacheProps } from './userNewslettersPage';

export default function CreateNewsletterPostPage() {
  const navigate = useNavigate();
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html } = data;
      console.log('exportHtml', html);
    });
  };

  const saveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design } = data;
      localStorage.setItem("test", JSON.stringify(design));
      // let localStorageDesign = localStorage.getItem("Newsletter");
      // let currentDesign: postCacheProps = JSON.parse(localStorageDesign ? localStorageDesign : "");

      // currentDesign.data = design;

      // localStorage.setItem("Newsletter", JSON.stringify(currentDesign));
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    let localStorageDesign = localStorage.getItem("Newsletter")!;
    // let currentDesign: postCacheProps = JSON.parse(localStorageDesign);
    let currentDesign = JSON.parse(localStorage.getItem("test")!);
    unlayer.loadDesign(currentDesign);
  };

  return (
    <div className='create-newsletter-post-container'>
      <AiOutlineArrowLeft size={30} className="create-newsletter-post-back-button" onClick={() => {saveDesign(); navigate(-1);}}/>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
      <div className='create-newsletter-post-button-container'>
        <button className='create-newsletter-post-button' onClick={exportHtml}>Export HTML</button>
      </div>
    </div>
  );
};