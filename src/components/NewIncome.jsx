import newIncome from '../assets/newIncome.png'; 

const NewIncome = () => {
  return (
    <div className="flex items-center justify-center py-16 bg-gray-300">
      <img
        src={newIncome}
        alt="Nueva Colección"
        className="w-auto max-w-md md:max-w-lg lg:max-w-xl"
      />
    </div>
  );
};

export default NewIncome;