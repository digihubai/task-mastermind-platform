
import React from "react";
import { Paperclip } from "lucide-react";

interface TicketAttachmentFieldProps {
  files: FileList | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TicketAttachmentField: React.FC<TicketAttachmentFieldProps> = ({ files, onChange }) => {
  return (
    <div>
      <label htmlFor="attachments" className="block text-sm font-medium mb-1">
        Attachments
      </label>
      <div className="flex items-center gap-2">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground">
            <Paperclip className="h-4 w-4" /> 
            <span>Upload Files</span>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={onChange}
          />
        </label>
        {files && files.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>
      {files && files.length > 0 && (
        <div className="mt-2">
          <ul className="text-xs text-muted-foreground">
            {Array.from(files).map((file, index) => (
              <li key={index} className="truncate">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
