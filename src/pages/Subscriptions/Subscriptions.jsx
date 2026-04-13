import "./Subscriptions.scss";
import { Sidebar, Footer } from "../../containers";

export const Subscriptions = () => (
  <>
    <Sidebar />
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
                {plan.features.map((f, i) => (
                  <li key={i}><span className="subs__check">✓</span> {f}</li>
                ))}
              </ul>
              <button className="subs__btn">Оформить подписку</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </>
);

const PLANS = [
  {
    id: 1, name: "Базовый", price: "299 ₽", popular: false,
    features: ["HD качество", "1 экран", "Без рекламы"],
  },
  {
    id: 2, name: "Стандарт", price: "499 ₽", popular: true,
    features: ["Full HD качество", "2 экрана", "Без рекламы", "Скачивание"],
  },
  {
    id: 3, name: "Премиум", price: "799 ₽", popular: false,
    features: ["4K качество", "4 экрана", "Без рекламы", "Скачивание", "Ранний доступ"],
  },
];