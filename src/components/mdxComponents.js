import Image from "next/image";

const mdxComponents = {
  img: (props) => (
    // height and width are part of the props, so they get automatically passed here with {...props}
    (<Image {...props} layout="responsive" loading="lazy" alt="" sizes="25vw" />)
  ),
};
export default mdxComponents;
