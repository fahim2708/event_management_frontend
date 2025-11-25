import { useParams } from "react-router-dom";
export default function ContactUs() {
  const {id} = useParams();
  return <div>This contact us page — ID: {id}</div>;
}
