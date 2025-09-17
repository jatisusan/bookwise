interface Props {
  title: string;
  fetcher: () => Promise<number>;
}

const StatCard = async ({ title, fetcher }: Props) => {
  const value = await fetcher();
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-base text-slate-500">{title}</h3>
      <p className="text-3xl font-bold text-dark-400">{value}</p>
    </div>
  );
};

export default StatCard;
