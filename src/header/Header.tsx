import React from "react";

interface HeaderProps {
  title: string;
  image: string;
  altText: string;
  subContent: string;
}

const Header = ({ title, image, altText, subContent }: HeaderProps) => {
  return (
    <header className="relative flex flex-col w-full h-full">

        <div className="bg-black absolute inset-0 opacity-30"></div>

      <h1 className="text-6xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1§">
        {title}
      </h1>

      <img src={image} alt={altText} />

      <p className="absolute right-40 top-145 text-3xl text-white">{subContent}</p>
    </header>
  );
};

export default Header;
