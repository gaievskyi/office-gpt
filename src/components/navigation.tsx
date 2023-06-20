import Link from "next/link"

export const Navigation = () => (
  <nav className="flex flex-col gap-5 uppercase">
    <div>
      <Link href="/">Lead hunter</Link>
    </div>
    <div>
      <Link href="/" className="text-[#ccc]">
        Another tool
      </Link>
    </div>
    <div>
      <Link href="/" className="text-[#ccc]">
        Lorem ipsum
      </Link>
    </div>
  </nav>
)
