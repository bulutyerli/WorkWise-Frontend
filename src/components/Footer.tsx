export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="footer" className="text-sm text-end pr-5">
      &copy; {year} All rights reserved. Bulut Yerli
    </footer>
  );
}
