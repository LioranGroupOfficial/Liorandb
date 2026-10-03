import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {Activity, BookOpenText, Check, Copy, Gauge, ServerCog} from 'lucide-react';

import styles from './index.module.css';

const DOCKER_CMD =
  'docker run -d --name liorandb -p 27018:27018 -p 27019:27019 -p 27201:27201 -v ldb-data:/var/lib/liorandb/data liorandb/liorandb:pre-alpha';

export default function Home(): ReactNode {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DOCKER_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <Layout
      title="LioranDB Docs"
      description="LioranDB documentation for solo Docker installs, the JavaScript and TypeScript driver, the CLI, and managed deployment.">
      <main className={styles.page}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.copy}>
              <Heading as="h1" className={styles.title}>
                Run it locally.
              </Heading>
              
              <p className={styles.lead}>
                Start a single local LioranDB node with Docker, then watch the
                bootstrap password and server listeners come up exactly like this.
              </p>
              
              <div className={styles.actions}>
                <Link className={styles.primaryAction} to="/docs/getting-started/solo">
                  <BookOpenText className={styles.actionIcon} aria-hidden="true" />
                  <span>Continue to Getting Started</span>
                </Link>
                <Link className={styles.secondaryAction} to="/docs/deployment/managed">
                  <ServerCog className={styles.actionIcon} aria-hidden="true" />
                  <span>Open Deployment Guide</span>
                </Link>
              </div>
            </div>

            {/* Terminal Surface */}
            <div className={styles.terminalShell}>
              <div className={styles.terminalBar}>
                <div className={styles.windowControls} aria-hidden="true">
                  <span className={styles.dotClose} />
                  <span className={styles.dotMinimize} />
                  <span className={styles.dotMaximize} />
                </div>
                <div className={styles.terminalPath}>
                  <span className={styles.pathPrompt}>omen@local</span>
                  <span className={styles.pathSeparator}>:</span>
                  <span className={styles.pathValue}>~/liorandb</span>
                </div>
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={handleCopy}
                  title="Copy command to clipboard"
                  aria-label="Copy Docker command">
                  {copied ? (
                    <Check className={styles.copyIcon} aria-hidden="true" />
                  ) : (
                    <Copy className={styles.copyIcon} aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className={styles.terminalBody}>
                <div className={styles.commandRow}>
                  <span className={styles.shellPrompt}>$</span>
                  <span className={styles.commandText}>
                    {DOCKER_CMD}
                  </span>
                </div>
                <pre className={styles.outputCode}>
                  <div className={styles.logLine}>
                    liorandb-startup: scope=dbms.local stage=table_registration elapsed_ms=0
                  </div>
                  <div className={styles.logLine}>
                    liorandb-startup: scope=dbms.local stage=collection_metadata_warmup elapsed_ms=0
                  </div>
                  <div className={styles.logLine}>
                    liorandb-startup: scope=dbms.local stage=open_total elapsed_ms=0
                  </div>
                  <div className={styles.logLine}>
                    liorandb-startup: scope=dbms.local total_elapsed_ms=0 accounted_ms=123 unexplained_ms=0
                  </div>
                  <div className={styles.bootstrapLine}>
                    liorandb-bootstrap: username=admin temporary_password=Q7m!Z2x@L9p#R4vK
                  </div>
                  <div className={styles.successLine}>
                    [server started] HTTP 0.0.0.0:27018 gRPC 0.0.0.0:27019 metrics 0.0.0.0:27201
                  </div>
                  <div className={styles.infoLine}>
                    Press Ctrl+C to begin graceful shutdown.
                  </div>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Benchmark Section */}
        <section className={styles.benchmarkSection}>
          <div className={styles.benchmarkContainer}>
            <div className={styles.benchmarkHeader}>
              <p className={styles.benchmarkEyebrow}>Benchmark</p>
              <Heading as="h2" className={styles.benchmarkTitle}>
                Throughput at a glance.
              </Heading>
            </div>
            <div className={styles.benchmarks}>
              <article className={styles.benchmarkCard}>
                <div className={styles.benchmarkMeta}>
                  <Gauge className={styles.benchmarkIcon} aria-hidden="true" />
                  <span className={styles.benchmarkLabel}>WRPS</span>
                </div>
                <strong className={styles.benchmarkValue}>10k</strong>
              </article>
              <article className={styles.benchmarkCard}>
                <div className={styles.benchmarkMeta}>
                  <Activity className={styles.benchmarkIcon} aria-hidden="true" />
                  <span className={styles.benchmarkLabel}>RPS</span>
                </div>
                <strong className={styles.benchmarkValue}>35k</strong>
              </article>
              <article className={styles.benchmarkCard}>
                <div className={styles.benchmarkMeta}>
                  <ServerCog className={styles.benchmarkIcon} aria-hidden="true" />
                  <span className={styles.benchmarkLabel}>OPS</span>
                </div>
                <strong className={styles.benchmarkValue}>45k</strong>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
