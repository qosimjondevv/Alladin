import "./Subscriptions.scss";
import { PLANS } from "../../constants";

export const Subscriptions = () => (
  <div className="subs">
    <div className="container">
      <h1 className="subs__title">Подписки</h1>
      <div className="subs__grid">
        {PLANS.map((plan) => (
          <div key={plan.id} className={`subs__card ${plan.popular ? "subs__card--popular" : ""}`}>
            {plan.popular && <span className="subs__badge">Популярный</span>}
            <h2 className="subs__plan-name">{plan.name}</h2>
            <div className="subs__price">
              <span className="subs__price-amount">{plan.price}</span>
              <span className="subs__price-period">/ мес</span>
            </div>
            <ul className="subs__features">
              {plan.features.map((f) => (
                <li key={f}><span className="subs__check">✓</span> {f}</li>
              ))}
            </ul>
            <button className="subs__btn">Оформить подписку</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);