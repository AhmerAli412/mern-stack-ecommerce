import "./home.css";
import Analytics from '../analytics/Analytics'
import WidgetSm from "../../components/widgetSm/WidgetSm";

export default function Home() {
  return (
    <div className="home">
    
      <Analytics/>
      <WidgetSm />
    </div>
  );
}
