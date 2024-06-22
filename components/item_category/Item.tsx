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
      className="border flex justify-center items-center p-8 shadow-xl flex-col rounded-lg bg-slate-300 w-60 max-lg:w-40 max-md:w-24 max-sm:w-40 hover:bg-slate-200"
    >
      <Image src={icon} alt={label} height={60} width={60} />
      <p className="font-bold">{label}</p>
    </Link>
  );
};

export default Item;
