"use client";
import { useState, type FormEvent } from "react";
import { Icon } from "./icons";

export function ApplicationForm() {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Demo validation complete. No application or personal information has been sent.");
  };
  return <form className="application-form" onSubmit={submit}>
    <h2>Apply for this position</h2>
    <label>Name*<input name="name" autoComplete="name" required maxLength={100}/></label>
    <label>Email*<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
    <label>Resume*<span className="file-field"><span>{fileName || "Choose File (PDF, DOC, DOCX)"}</span><Icon name="upload"/><input name="resume" type="file" accept=".pdf,.doc,.docx" required onChange={event => {
      const input = event.target;
      const file = input.files?.[0];
      const valid = !file || /\.(pdf|docx?)$/i.test(file.name);
      input.setCustomValidity(valid ? "" : "Please choose a PDF, DOC, or DOCX file.");
      setFileName(file?.name ?? "");
      setStatus("");
    }}/></span></label>
    <label>Message*<textarea name="message" required maxLength={5000} placeholder="Tell us about yourself and why you're interested in this role..."/></label>
    <button type="submit" className="button button-primary">Submit Application</button>
    <p className="form-status" role="status">{status}</p>
  </form>;
}
