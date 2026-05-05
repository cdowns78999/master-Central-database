import json
import pandas as pd

def load_branding():
    with open('assets/branding.json', 'r') as f:
        return json.load(f)

def create_excel(filename):
    brand = load_branding()
    
    # Create sample data
    data = {
        'Industry': ['Finance', 'Healthcare', 'Marketing', 'Legal'],
        'Impact Score': [95, 88, 92, 85],
        'Growth Prediction': ['Exponential', 'Steady', 'Rapid', 'Moderate']
    }
    
    df = pd.DataFrame(data)
    
    writer = pd.ExcelWriter(f"output/{filename}", engine='openpyxl')
    df.to_excel(writer, sheet_name='Overview', index=False)
    
    # Add quarterly tabs
    for q in ['Q1', 'Q2', 'Q3', 'Q4']:
        q_df = df.copy()
        q_df['Quarter'] = q
        q_df.to_excel(writer, sheet_name=q, index=False)
    
    writer.close()
    print(f"Excel generated: {filename}")

if __name__ == "__main__":
    create_excel("GenAI_Market_Impact.xlsx")
