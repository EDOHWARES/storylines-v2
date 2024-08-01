import React from 'react';
import Sidebar from './components/layout/Sidebar';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="layout md:flex md:space-x-8">
        <Sidebar />
        <div className="content rounded-3xl ml-16 md:ml-0 md:mt-0 p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo aut inventore doloremque enim necessitatibus odio officia nulla asperiores earum quibusdam praesentium nesciunt obcaecati a harum ratione, accusamus voluptatem magni dolores aliquam molestiae, eum porro. Animi dolorum omnis error? Ipsum in dolores iusto. Voluptatibus, iure dolores facere, facilis labore tenetur ex voluptates illo a laboriosam debitis non sunt commodi quos quia quo distinctio inventore vero id aliquid beatae! Quam reprehenderit accusantium recusandae fuga, praesentium optio totam non! Ab error itaque animi ratione ipsam at dolorem. Tempora sequi dicta repellendus error ullam debitis, provident autem id minus ab molestiae sit nemo quasi!
        </div>
      </div>
    </div>
  );
};

export default App;
