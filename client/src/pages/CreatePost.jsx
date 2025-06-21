import { useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import Tiptap from "../Tiptap-rich-editor/Tiptap";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Category:", category);
    console.log("Image:", image);
    console.log("Content:", content);

    alert("Post Submitted! (Check console)");
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title + Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            className="flex-1"
            required
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Uncategorized">Select a category</option>
            <option value="Education">Education</option>
            <option value="Technology">Technology</option>
            <option value="Industies">Industries</option>
            <option value="Coding">Coding</option>
            <option value="Others">Others</option>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3 overflow-x-hidden">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="md:w-fit "
          />
          <Button
            type="button"
            size="md"
            outline
            className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:opacity-85 text-white"
          >
            Upload Image
          </Button>
        </div>

        {/* Rich Text Editor */}
        <Tiptap onContentChange={setContent} />

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:opacity-85"
        >
          Publish
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
