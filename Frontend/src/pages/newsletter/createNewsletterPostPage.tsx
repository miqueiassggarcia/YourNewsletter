import { useRef } from 'react';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

import "../../styles/newsletter/createNewsletterPost.css";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from "react-router-dom"
import { relative } from 'path';

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
      let currentId = localStorage.getItem("NewsletterIdEdited");
      if(currentId) {
        localStorage.setItem(`Newsletter-${currentId}`, JSON.stringify(design));
      }
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    let currentId = localStorage.getItem("NewsletterIdEdited");
    if(currentId) {
      let currentDesign = localStorage.getItem(`Newsletter-${currentId}`);
      if(currentDesign) {
        let design = JSON.parse(currentDesign);
        unlayer.loadDesign(design);
      }
    }
  };

  return (
    <div className='create-newsletter-post-container'>
      <AiOutlineArrowLeft size={30} className="create-newsletter-post-back-button" onClick={() => {saveDesign(); navigate(-1);}}/>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
      <div className='create-newsletter-post-button-container'>
        <button className='create-newsletter-post-button' onClick={exportHtml}>Definir Design</button>
      </div>
    </div>
  );
};