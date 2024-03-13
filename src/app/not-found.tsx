import styles from "@/app/page.module.css";

export default function NotFound() {
  return (
    <>
      <main className={styles.main}>
        <h1>Page Not Found</h1>
      </main>
    </>
  );
}

export const dynamic = "force-dynamic";
