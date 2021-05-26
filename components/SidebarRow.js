import Image from 'next/image';

// The Rows of SideBar
function SidebarRow({ src, Icon, title }) {
  return (
    <div
      className="flex items-center space-x-2 p-4 
    hover:bg-gray-200 rounded-xl cursor:pointer"
    >
      {/* CONDITIONAL RENDER JSX here */}
      {/* If src={} - we render picture */}
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={30}
          height={30}
          layout="fixed"
        />
      )}
      {/* If Icon={} - render icon*/}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
}

export default SidebarRow;
