import { useRef } from 'react';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

import "../../styles/newsletter/createNewsletterPost.css";

export default function CreateNewsletterPostPage() {
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };

  return (
    <div className='create-newsletter-post-container'>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
      <div className='create-newsletter-post-button-container'>
        <button className='create-newsletter-post-button' onClick={exportHtml}>Export HTML</button>
      </div>
    </div>
  );
};