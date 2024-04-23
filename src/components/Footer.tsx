export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-sm">
      &copy; {year} All rights reserved. Bulut Yerli
    </footer>
  );
}
