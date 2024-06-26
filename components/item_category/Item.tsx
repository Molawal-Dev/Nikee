import Image from "next/image";
import Link from "next/link";

interface itemProps {
  icon: string;
  label: string;
  href: string;
}

const Item = ({ icon, label, href }: itemProps) => {
  return (
    <Link
      href={href}
      className="border flex justify-center items-center p-5 shadow-xl flex-col rounded-lg bg-slate-300 w-40 max-lg:w-36 max-md:w-32 max-sm:w-24 hover:bg-slate-200"
    >
      <Image src={icon} alt={label} height={40} width={40} />
      <p className="font-bold">{label}</p>
    </Link>
  );
};

export default Item;
