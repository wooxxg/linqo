import { published } from "@/content/availability";
import { ko, AUTH_URL, type Item } from "@/content/ko";
import { AvailabilityBadge } from "@/components/availability-badge";
import { ContextDemo } from "@/components/context-demo";
import { Hero } from "@/components/hero";
import { UseCases } from "@/components/use-cases";

function Nav() {
  const t = ko.nav;
  return (
    <header className="nav gutter">
      <div className="nav-inner">
        <a className="logo" href="#hero">
          LINQO
        </a>
        <nav className="nav-links" aria-label="주요 메뉴">
          {t.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <a className="login" href={AUTH_URL}>
            {t.login}
          </a>
          <a className="btn btn-primary btn-sm" href={AUTH_URL}>
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="section-head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}

function How() {
  const t = ko.how;
  return (
    <section className="section gutter" id="how">
      <div className="container">
        <SectionHead title={t.title} />
        <ol className="steps">
          {t.steps.map((step, i) => (
            <li key={step.title}>
              <span className="step-num">0{i + 1}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Context() {
  const t = ko.context;
  return (
    <section className="section gutter" id="context">
      <div className="container">
        <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        <ContextDemo />
        <ul className="points">
          {published(t.points).map((point) => (
            <li key={point.title}>
              <strong>{point.title}</strong>
              <p>{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Mcp() {
  const t = ko.mcp;
  return (
    <section className="section gutter" id="mcp">
      <div className="container split">
        <div>
          <SectionHead eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
          <p className="prompts-label">{t.promptsLabel}</p>
          <ul className="prompts">
            {t.prompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
          <div className="trust">
            <strong>{t.trustTitle}</strong>
            <p>{t.trust}</p>
          </div>
          <p className="support">{t.support}</p>
        </div>
        <div className="chat" aria-label={`${t.chat.app} 대화 예시`}>
          <div className="chat-bar">{t.chat.app}</div>
          <div className="chat-body">
            <p className="msg msg-user">{t.chat.question}</p>
            <p className="msg-tool">{t.chat.tool}</p>
            <div className="msg msg-ai">
              <p>{t.chat.answer}</p>
              <p className="msg-source">{t.chat.source}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section className="section gutter" id="use-cases">
      <div className="container">
        <SectionHead title={ko.useCases.title} />
        <UseCases />
      </div>
    </section>
  );
}

function ItemGrid({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: readonly Item[];
}) {
  return (
    <section className="section gutter" id={id}>
      <div className="container">
        <SectionHead title={title} />
        <ul className="grid">
          {items.map((item) => (
            <li key={item.title} className={item.availability === "soon" ? "is-soon" : undefined}>
              <strong>
                {item.title}
                <AvailabilityBadge availability={item.availability} />
              </strong>
              {item.body && <p>{item.body}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Pricing() {
  const t = ko.pricing;
  return (
    <section className="section gutter" id="pricing">
      <div className="container">
        <SectionHead title={t.title} sub={t.sub} />
        <ul className="plans">
          {t.plans.map((plan) => (
            <li key={plan.name} className={"popular" in plan ? "plan is-popular" : "plan"}>
              {"popular" in plan && <span className="plan-flag">{t.popular}</span>}
              <h3>{plan.name}</h3>
              <p className="plan-price">
                <span>{plan.price}</span> / {plan.cadence}
              </p>
              <p className="plan-desc">{plan.description}</p>
              <ul className="checks">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className={"popular" in plan ? "btn btn-primary" : "btn btn-ghost"} href={AUTH_URL}>
                {t.cta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  const t = ko.faq;
  return (
    <section className="section gutter" id="faq">
      <div className="container narrow">
        <SectionHead title={t.title} />
        <div className="faq">
          {published(t.items).map((item) => (
            <details key={item.title}>
              <summary>
                {item.title}
                <AvailabilityBadge availability={item.availability} />
              </summary>
              <p>{item.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const t = ko.finalCta;
  return (
    <section className="section final gutter">
      <div className="container final-inner">
        <h2>{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
        <a className="btn btn-primary btn-lg" href={AUTH_URL}>
          {t.cta}
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <How />
        <Context />
        <Mcp />
        <UseCasesSection />
        <ItemGrid id="features" title={ko.features.title} items={published(ko.features.items)} />
        <ItemGrid id="security" title={ko.security.title} items={published(ko.security.items)} />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <footer className="footer gutter">
        <div className="container">{ko.footer.copyright}</div>
      </footer>
    </>
  );
}
