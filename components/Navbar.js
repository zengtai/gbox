import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ menuOpen }) {
  const router = useRouter();
  const current = router.query;
  const pathname = router.pathname;
  const asPath = router.asPath;

  console.log(`router`, router);
  console.log(`current`, current);
  console.log(`pathname`, pathname);
  console.log(`asPath`, asPath);

  const navItems = [
    {
      text: `Home`,
      link: `/`,
    },
    {
      text: `Puzzle`,
      link: `/category/puzzle/`,
    },
    {
      text: `Arcade`,
      link: `/category/arcade/`,
    },
    {
      text: `Shooting`,
      link: `/category/shooting/`,
    },
    {
      text: `Strategy`,
      link: `/category/strategy/`,
    },
    {
      text: `Sports`,
      link: `/category/sports/`,
    },
    {
      text: `Racing`,
      link: `/category/racing/`,
    },
    {
      text: `Match 3`,
      link: `/category/match-3/`,
    },
    {
      text: `Adventure`,
      link: `/category/adventure/`,
    },
    {
      text: `Simulation`,
      link: `/category/simulation/`,
    },
    {
      text: `Casual`,
      link: `/category/casual/`,
    },
    {
      text: `.IO`,
      link: `/category/io/`,
    },
    {
      text: `Girl`,
      link: `/category/girl/`,
    },
  ];
  return (
    <nav className={`${!menuOpen ? `hidden` : `flex w-full`} navbar`}>
      <ul className="navbar-list">
        {navItems.map((i) => (
          <li key={i.text}>
            <Link
              title={i.text}
              className={`navbar-link ${
                !(
                  i.link === asPath ||
                  i.link === `${asPath}/` ||
                  (i.link !== `/` && asPath.match(i.link))
                )
                  ? "bg-rose-300 text-rose-700"
                  : "bg-rose-50 text-rose-600"
              }`}
              href={i.link}
            >
              {i.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
