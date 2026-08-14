import type {ReactNode} from 'react';
import {createContext, useContext, useMemo, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';

import styles from './styles.module.css';

type DeploymentValues = {
  clientName: string;
  rootDomain: string;
  serverIp: string;
  httpDomain: string;
  grpcDomain: string;
  deployRoot: string;
  volumeName: string;
  metricsNetworkName: string;
  bootstrapPath: string;
};

const DeploymentSetupContext = createContext<DeploymentValues | null>(null);

function normalize(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed || fallback;
}

function useDeploymentSetupValues(): DeploymentValues {
  const context = useContext(DeploymentSetupContext);

  if (!context) {
    throw new Error(
      'Deployment setup components must be used inside DeploymentSetupProvider.',
    );
  }

  return context;
}

function replaceTokens(input: string, values: DeploymentValues): string {
  return input
    .replaceAll('{{clientName}}', values.clientName)
    .replaceAll('{{rootDomain}}', values.rootDomain)
    .replaceAll('{{serverIp}}', values.serverIp)
    .replaceAll('{{httpDomain}}', values.httpDomain)
    .replaceAll('{{grpcDomain}}', values.grpcDomain)
    .replaceAll('{{deployRoot}}', values.deployRoot)
    .replaceAll('{{volumeName}}', values.volumeName)
    .replaceAll('{{metricsNetworkName}}', values.metricsNetworkName)
    .replaceAll('{{bootstrapPath}}', values.bootstrapPath);
}

export function DeploymentSetupProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [clientNameInput, setClientNameInput] = useState('acme');
  const [rootDomainInput, setRootDomainInput] = useState('example.com');
  const [serverIpInput, setServerIpInput] = useState('203.0.113.10');

  const values = useMemo<DeploymentValues>(() => {
    const clientName = normalize(clientNameInput, 'acme');
    const rootDomain = normalize(rootDomainInput, 'example.com');
    const serverIp = normalize(serverIpInput, '203.0.113.10');
    const httpDomain = `${clientName}.db.${rootDomain}`;
    const grpcDomain = `${clientName}.grpc.${rootDomain}`;
    const deployRoot = `/opt/liorandb-${clientName}`;
    const volumeName = `liorandb-${clientName}-data`;
    const metricsNetworkName = `liorandb-${clientName}_metrics-private`;
    const bootstrapPath = `${deployRoot}/clients/${clientName}/bootstrap-password.txt`;

    return {
      clientName,
      rootDomain,
      serverIp,
      httpDomain,
      grpcDomain,
      deployRoot,
      volumeName,
      metricsNetworkName,
      bootstrapPath,
    };
  }, [clientNameInput, rootDomainInput, serverIpInput]);

  return (
    <DeploymentSetupContext.Provider value={values}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <p className={styles.title}>Set your deployment values</p>
          <p className={styles.subtitle}>
            Fill these once. The domains, paths, volume names, and commands
            below update automatically across this page.
          </p>
        </div>

        <div className={styles.grid}>
          <label className={styles.field}>
            <span className={styles.label}>Client name</span>
            <input
              className={styles.input}
              value={clientNameInput}
              onChange={(event) => setClientNameInput(event.target.value)}
            />
          </label>

        <label className={styles.field}>
          <span className={styles.label}>Root domain</span>
          <input
            className={styles.input}
            value={rootDomainInput}
            onChange={(event) => setRootDomainInput(event.target.value)}
          />
        </label>

          <label className={styles.field}>
            <span className={styles.label}>Server IP</span>
            <input
              className={styles.input}
              value={serverIpInput}
              onChange={(event) => setServerIpInput(event.target.value)}
            />
          </label>
        </div>

        <div className={styles.results}>
          <p className={styles.resultsTitle}>Derived values</p>
          <div className={styles.chips}>
          <span className={styles.chip}>HTTP domain: {values.httpDomain}</span>
          <span className={styles.chip}>gRPC domain: {values.grpcDomain}</span>
            <span className={styles.chip}>Deploy root: {values.deployRoot}</span>
            <span className={styles.chip}>Volume: {values.volumeName}</span>
            <span className={styles.chip}>
              Metrics network: {values.metricsNetworkName}
            </span>
            <span className={styles.chip}>Public IP: {values.serverIp}</span>
          </div>
          <p className={styles.note}>
            These same values now flow through the examples and commands below.
          </p>
        </div>
      </div>

      {children}
    </DeploymentSetupContext.Provider>
  );
}

export function DeploymentValue({
  field,
  code = true,
}: {
  field: keyof DeploymentValues;
  code?: boolean;
}): ReactNode {
  const values = useDeploymentSetupValues();
  const value = values[field];

  if (code) {
    return <code>{value}</code>;
  }

  return <>{value}</>;
}

export function DeploymentText({
  template,
  code = true,
}: {
  template: string;
  code?: boolean;
}): ReactNode {
  const values = useDeploymentSetupValues();
  const text = replaceTokens(template, values);

  if (code) {
    return <code>{text}</code>;
  }

  return <>{text}</>;
}

export function DeploymentCode({
  language,
  template,
}: {
  language: string;
  template: string;
}): ReactNode {
  const values = useDeploymentSetupValues();

  return <CodeBlock language={language}>{replaceTokens(template, values)}</CodeBlock>;
}
