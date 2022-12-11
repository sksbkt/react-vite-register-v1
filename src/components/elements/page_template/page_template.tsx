import React from "react";
import styles from './page_template.module.scss'

interface pageTemplateProps {
    children: React.ReactNode
}

function PageTemplate({ children }: pageTemplateProps) {
    return (<div className={styles.templateRoot}>
        <section className={styles.templateSection}>
            {children}
        </section>
    </div>);
}

export default PageTemplate;
